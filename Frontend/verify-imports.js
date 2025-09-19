#!/usr/bin/env node

/**
 * Import Verification Script
 * Checks all import statements in the Frontend to ensure referenced files exist
 * Run with: node verify-imports.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');
const errors = [];
const warnings = [];

function resolveImportPath(currentFile, importPath) {
  // Handle relative imports
  if (importPath.startsWith('./') || importPath.startsWith('../')) {
    const currentDir = path.dirname(currentFile);
    let resolvedPath = path.resolve(currentDir, importPath);
    
    // Try different extensions
    const extensions = ['', '.js', '.jsx', '.ts', '.tsx', '.css'];
    for (const ext of extensions) {
      const tryPath = resolvedPath + ext;
      if (fs.existsSync(tryPath)) {
        return tryPath;
      }
    }
    
    // Try index files
    for (const ext of ['.js', '.jsx', '.ts', '.tsx']) {
      const indexPath = path.join(resolvedPath, 'index' + ext);
      if (fs.existsSync(indexPath)) {
        return indexPath;
      }
    }
    
    return null;
  }
  
  // Handle absolute imports from src
  if (!importPath.startsWith('.')) {
    // Try node_modules (assume these are OK)
    return 'node_modules';
  }
  
  return null;
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    // Match import statements
    const importMatch = line.match(/import.*from\s+['"]([^'"]+)['"]/);
    if (importMatch) {
      const importPath = importMatch[1];
      
      // Skip node_modules imports
      if (!importPath.startsWith('.')) {
        return;
      }
      
      const resolvedPath = resolveImportPath(filePath, importPath);
      if (!resolvedPath) {
        errors.push({
          file: path.relative(srcDir, filePath),
          line: index + 1,
          import: importPath,
          message: `Cannot resolve import "${importPath}"`
        });
      } else if (resolvedPath !== 'node_modules') {
        // Check case sensitivity
        const expectedPath = path.resolve(path.dirname(filePath), importPath);
        const actualPath = resolvedPath;
        
        if (expectedPath !== actualPath && expectedPath.toLowerCase() === actualPath.toLowerCase()) {
          warnings.push({
            file: path.relative(srcDir, filePath),
            line: index + 1,
            import: importPath,
            message: `Case sensitivity issue: expected "${path.relative(path.dirname(filePath), expectedPath)}", found "${path.relative(path.dirname(filePath), actualPath)}"`
          });
        }
      }
    }
  });
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      scanDirectory(filePath);
    } else if (file.match(/\.(js|jsx|ts|tsx)$/)) {
      checkFile(filePath);
    }
  });
}

console.log('🔍 Verifying imports in Frontend/src...\n');

scanDirectory(srcDir);

if (errors.length > 0) {
  console.log('❌ ERRORS FOUND:');
  errors.forEach(error => {
    console.log(`  ${error.file}:${error.line} - ${error.message}`);
  });
  console.log('');
}

if (warnings.length > 0) {
  console.log('⚠️  WARNINGS:');
  warnings.forEach(warning => {
    console.log(`  ${warning.file}:${warning.line} - ${warning.message}`);
  });
  console.log('');
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ All imports are valid!');
} else {
  console.log(`Found ${errors.length} errors and ${warnings.length} warnings.`);
  if (errors.length > 0) {
    process.exit(1);
  }
}