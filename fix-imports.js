const fs = require('fs');
const path = require('path');

// Düzeltilecek dosyalar
const filesToFix = [
  'app/api/comments/route.ts',
  'app/api/topics/route.ts',
  'app/api/entries/route.ts'
];

// Her dosya için düzeltme işlemi
filesToFix.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  
  // Dosyayı oku
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // NextRequest importunu kaldır
  content = content.replace(/import\s*{\s*NextRequest,\s*NextResponse\s*}\s*from\s*'next\/server'\s*;/, "import { NextResponse } from 'next/server';");
  
  // Entries dosyasındaki any tipini kaldır
  if (filePath === 'app/api/entries/route.ts') {
    content = content.replace(/\.sort\(sort\s+as\s+any\)/, '.sort(sort)');
  }
  
  // Dosyayı kaydet
  fs.writeFileSync(fullPath, content, 'utf8');
  
  console.log(`✅ ${filePath} düzeltildi.`);
});

console.log('Tüm dosyalar düzeltildi!'); 