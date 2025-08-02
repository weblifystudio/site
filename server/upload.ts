import type { Request, Response } from 'express';
import { createWriteStream } from 'fs';
import { join } from 'path';
import crypto from 'crypto';
import multer from 'multer';
import fs from 'fs/promises';

// Configuration sécurisée pour les uploads
const UPLOAD_DIR = './uploads';
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const ALLOWED_TYPES = [
  // Documents
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  // Images
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  // Archives
  'application/zip',
  'application/x-rar-compressed',
  // Texte
  'text/plain',
  'text/csv'
];

export interface UploadedFile {
  id: string;
  originalName: string;
  filename: string;
  mimetype: string;
  size: number;
  path: string;
  uploadedAt: Date;
}

// Configuration multer pour les uploads sécurisés
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
      cb(null, UPLOAD_DIR);
    } catch (error) {
      cb(error as Error, UPLOAD_DIR);
    }
  },
  filename: (req, file, cb) => {
    const fileId = crypto.randomUUID();
    const extension = file.originalname.split('.').pop();
    const filename = `${fileId}.${extension}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non autorisé'));
    }
  }
});

export const uploadMiddleware = upload.single('file');

// Handler d'upload sécurisé avec multer
export async function handleFileUpload(req: Request, res: Response) {
  try {
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Aucun fichier reçu'
      });
    }

    // Le fichier a déjà été validé par multer
    const uploadedFile: UploadedFile = {
      id: crypto.randomUUID(),
      originalName: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      uploadedAt: new Date()
    };

    console.log(`📎 Fichier uploadé: ${file.originalname} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);

    res.json({
      success: true,
      file: uploadedFile,
      message: 'Fichier uploadé avec succès'
    });

  } catch (error) {
    console.error('❌ Erreur upload:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'upload'
    });
  }
}

// Types de fichiers supportés avec icônes
export const fileTypeInfo = {
  'application/pdf': { icon: '📄', name: 'PDF' },
  'application/msword': { icon: '📝', name: 'Word' },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { icon: '📝', name: 'Word' },
  'application/vnd.ms-excel': { icon: '📊', name: 'Excel' },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { icon: '📊', name: 'Excel' },
  'image/jpeg': { icon: '🖼️', name: 'Image' },
  'image/png': { icon: '🖼️', name: 'Image' },
  'image/gif': { icon: '🖼️', name: 'GIF' },
  'image/webp': { icon: '🖼️', name: 'Image' },
  'image/svg+xml': { icon: '🎨', name: 'SVG' },
  'application/zip': { icon: '📦', name: 'Archive' },
  'application/x-rar-compressed': { icon: '📦', name: 'Archive' },
  'text/plain': { icon: '📄', name: 'Texte' },
  'text/csv': { icon: '📊', name: 'CSV' }
};