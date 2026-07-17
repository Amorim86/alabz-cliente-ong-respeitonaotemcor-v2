/**
 * lib/firebase-admin.ts
 *
 * Singleton de inicialização do Firebase Admin SDK — Lazy Initialization.
 *
 * A inicialização ocorre apenas na PRIMEIRA CHAMADA a `getDb()` ou `getBucket()`,
 * nunca no momento do import. Isso é crítico para:
 * - Evitar erros no `npm run build` (sem vars de ambiente disponíveis no build time)
 * - Evitar re-inicialização em warm starts de funções serverless (Vercel)
 *
 * Este módulo é estritamente server-side. Nunca importe em Client Components.
 *
 * Variáveis de ambiente requeridas (por projeto, na Vercel):
 *   - FIREBASE_SERVICE_ACCOUNT_KEY  → JSON completo da Service Account (string)
 *   - FIREBASE_STORAGE_BUCKET       → Nome do bucket do Firebase Storage
 */

import { type App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import type { Bucket } from '@google-cloud/storage';

// ─── Lazy Initialization ──────────────────────────────────────────────────────

function getAdminApp(): App {
  // Reutiliza instância existente em warm starts serverless
  if (getApps().length > 0) {
    return getApp();
  }

  // Validação fail-fast das variáveis de ambiente
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    throw new Error(
      '[Firebase Admin] Variável FIREBASE_SERVICE_ACCOUNT_KEY não definida. ' +
        'Configure-a nas variáveis de ambiente da Vercel ou no .env.local.'
    );
  }

  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
  if (!storageBucket) {
    throw new Error(
      '[Firebase Admin] Variável FIREBASE_STORAGE_BUCKET não definida. ' +
        'Configure-a nas variáveis de ambiente da Vercel ou no .env.local.'
    );
  }

  // Parse seguro da Service Account
  let serviceAccount: object;
  try {
    serviceAccount = JSON.parse(serviceAccountKey) as object;
  } catch {
    throw new Error(
      '[Firebase Admin] FIREBASE_SERVICE_ACCOUNT_KEY contém JSON inválido. ' +
        'Verifique se o valor está em uma única linha sem quebras de linha extras.'
    );
  }

  return initializeApp({
    credential: cert(serviceAccount as Parameters<typeof cert>[0]),
    storageBucket,
  });
}

// ─── Accessors com Lazy Init ──────────────────────────────────────────────────
// A inicialização só ocorre quando estas funções são chamadas (runtime),
// nunca no momento do import (build time).

/**
 * Retorna a instância do Firestore Admin.
 * Use em Server Components e Route Handlers.
 */
export function getDb(): Firestore {
  return getFirestore(getAdminApp());
}

/**
 * Retorna o bucket padrão do Firebase Storage.
 * Use em Server Components e Route Handlers que fazem upload.
 */
export function getBucket(): Bucket {
  return getStorage(getAdminApp()).bucket();
}

// ─── Aliases para retrocompatibilidade ───────────────────────────────────────
// Mantém compatibilidade com imports existentes que usam `db` e `bucket` diretamente.
// Internamente, ambos chamam os accessors com lazy init.

export const db: Firestore = new Proxy({} as Firestore, {
  get(_target, prop) {
    return getDb()[prop as keyof Firestore];
  },
});

export const bucket: Bucket = new Proxy({} as Bucket, {
  get(_target, prop) {
    return getBucket()[prop as keyof Bucket];
  },
});
