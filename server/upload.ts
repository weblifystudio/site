import type { Request, Response } from 'express';
import { createWriteStream } from 'fs';
import { join } from 'path';
import crypto from 'crypto';

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

// Simulation d'upload sécurisé (en réalité, les fichiers seraient stockés)
export async function handleFileUpload(req: Request, res: Response) {
  try {
    // Simulation de réception de fichier
    const file = req.body.file; // En réalité, il faudrait multer pour gérer les uploads
    
    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Aucun fichier reçu'
      });
    }

    // Validation du type de fichier
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Type de fichier non autorisé'
      });
    }

    // Validation de la taille
    if (file.size > MAX_FILE_SIZE) {
      return res.status(400).json({
        success: false,
        message: 'Fichier trop volumineux (max 25MB)'
      });
    }

    // Création d'un ID unique pour le fichier
    const fileId = crypto.randomUUID();
    const filename = `${fileId}_${file.originalname}`;
    
    const uploadedFile: UploadedFile = {
      id: fileId,
      originalName: file.originalname,
      filename: filename,
      mimetype: file.mimetype,
      size: file.size,
      path: join(UPLOAD_DIR, filename),
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