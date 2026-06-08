#!/usr/bin/env node

/**
 * Setup script to copy universal-sf-ui library files
 * Run this after installing or updating @universal-sf-ui/product
 */

import {
  mkdir, copyFile, rm, writeFile,
} from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const targetDir = join(projectRoot, 'scripts', 'universal-sf-ui');

async function setupLibrary() {
  try {
    console.log('📦 Setting up universal-sf-ui...');

    // Source directory (from local file dependency or node_modules)
    let productSourceDir = join(projectRoot, '..', 'universal-sf-ui', 'packages', 'product');
    let uiSourceDir = join(projectRoot, '..', 'universal-sf-ui', 'packages', 'ui');
    let adobeCommerceSourceDir = join(projectRoot, '..', 'universal-sf-ui', 'packages', 'adobe-commerce');
    let commerceInterfaceSourceDir = join(projectRoot, '..', 'universal-sf-ui', 'packages', 'commerce-interface');
    let authSourceDir = join(projectRoot, '..', 'universal-sf-ui', 'packages', 'auth');

    // Check if it's a symlink in node_modules
    if (!existsSync(productSourceDir)) {
      productSourceDir = join(projectRoot, 'node_modules', '@universal-sf-ui', 'product');
      uiSourceDir = join(projectRoot, 'node_modules', '@universal-sf-ui', 'ui');
      adobeCommerceSourceDir = join(projectRoot, 'node_modules', '@universal-sf-ui', 'adobe-commerce');
      commerceInterfaceSourceDir = join(projectRoot, 'node_modules', '@universal-sf-ui', 'commerce-interface');
      authSourceDir = join(projectRoot, 'node_modules', '@universal-sf-ui', 'auth');
    }

    if (!existsSync(productSourceDir)) {
      console.error('❌ @universal-sf-ui/product not found');
      console.error('   Please install it first: npm install');
      process.exit(1);
    }

    console.log(`📁 Product source: ${productSourceDir}`);
    console.log(`📁 UI source: ${uiSourceDir}`);
    console.log(`📁 Adobe Commerce source: ${adobeCommerceSourceDir}`);
    console.log(`📁 Commerce Interface source: ${commerceInterfaceSourceDir}`);
    console.log(`📁 Auth source: ${authSourceDir}`);

    // Clean target directory if it exists
    if (existsSync(targetDir)) {
      console.log('🧹 Cleaning existing files...');
      await rm(targetDir, { recursive: true, force: true });
    }

    // Create target directory
    await mkdir(targetDir, { recursive: true });
    console.log('✅ Created: scripts/universal-sf-ui/');

    // Files to copy from @universal-sf-ui/product (chunk names are static via manualChunks in vite.config)
    const productFiles = [
      { src: 'dist/index.js', dest: 'index.js' },
      { src: 'dist/stores.js', dest: 'stores.js' },
      { src: 'dist/productListStore.js', dest: 'productListStore.js' },
      { src: 'dist/style.css', dest: 'style.css' },
      { src: 'src/tokens.css', dest: 'tokens.css' },
      { src: 'dist/index.d.ts', dest: 'types/index.d.ts', optional: true },
    ];

    // Files to copy from @universal-sf-ui/ui (chunk names are static via manualChunks in vite.config)
    const uiFiles = [
      { src: 'dist/utils.js', dest: 'ui/utils.js' },
      { src: 'dist/render.js', dest: 'ui/render.js' },
      { src: 'dist/utils/index.d.ts', dest: 'types/ui/utils/index.d.ts', optional: true },
    ];

    // Files to copy from @universal-sf-ui/adobe-commerce
    const adobeCommerceFiles = [
      { src: 'dist/index.js', dest: 'adobe-commerce/index.js' },
      { src: 'dist/index.d.ts', dest: 'types/adobe-commerce/index.d.ts', optional: true },
    ];

    // Files to copy from @universal-sf-ui/commerce-interface
    const commerceInterfaceFiles = [
      { src: 'dist/index.js', dest: 'commerce-interface/index.js' },
      { src: 'dist/types.js', dest: 'commerce-interface/types.js' },
      { src: 'dist/index.d.ts', dest: 'types/commerce-interface/index.d.ts', optional: true },
    ];

    // Files to copy from @universal-sf-ui/auth
    const authFiles = [
      { src: 'dist/index.js', dest: 'auth/index.js' },
      { src: 'dist/style.css', dest: 'auth/style.css' },
      { src: 'dist/index.d.ts', dest: 'types/auth/index.d.ts', optional: true },
    ];

    const vendorDeps = [
      { pkg: 'preact', src: 'dist/preact.module.js', dest: 'vendor/preact.js' },
      { pkg: 'preact', src: 'jsx-runtime/dist/jsxRuntime.module.js', dest: 'vendor/jsx-runtime.js' },
      { pkg: 'preact', src: 'hooks/dist/hooks.module.js', dest: 'vendor/preact-hooks.js' },
      { pkg: 'preact', src: 'compat/dist/compat.module.js', dest: 'vendor/preact-compat.js' },
      { pkg: 'zustand', src: 'esm/vanilla.mjs', dest: 'vendor/zustand-vanilla.js' },
    ];

    // Copy universal-sf-ui product files
    console.log('');
    console.log('📦 Copying product components...');
    for (const { src, dest, optional } of productFiles) {
      const srcPath = join(productSourceDir, src);
      const destPath = join(targetDir, dest);

      if (existsSync(srcPath)) {
        // Create subdirectory if needed
        const destDir = dirname(destPath);
        if (!existsSync(destDir)) {
          await mkdir(destDir, { recursive: true });
        }

        await copyFile(srcPath, destPath);
        console.log(`✅ Copied: ${dest}`);
      } else if (!optional) {
        console.warn(`⚠️  File not found: ${src}`);
      }
    }

    // Copy universal-sf-ui ui files
    console.log('');
    console.log('📦 Copying UI utils...');
    for (const { src, dest, optional } of uiFiles) {
      const srcPath = join(uiSourceDir, src);
      const destPath = join(targetDir, dest);

      if (existsSync(srcPath)) {
        const destDir = dirname(destPath);
        if (!existsSync(destDir)) {
          await mkdir(destDir, { recursive: true });
        }

        await copyFile(srcPath, destPath);
        console.log(`✅ Copied: ${dest}`);
      } else if (!optional) {
        console.warn(`⚠️  File not found: ${src}`);
      }
    }

    // Copy adobe-commerce files
    console.log('');
    console.log('📦 Copying Adobe Commerce service...');
    for (const { src, dest, optional } of adobeCommerceFiles) {
      const srcPath = join(adobeCommerceSourceDir, src);
      const destPath = join(targetDir, dest);

      if (existsSync(srcPath)) {
        const destDir = dirname(destPath);
        if (!existsSync(destDir)) {
          await mkdir(destDir, { recursive: true });
        }

        await copyFile(srcPath, destPath);
        console.log(`✅ Copied: ${dest}`);
      } else if (!optional) {
        console.warn(`⚠️  File not found: ${src}`);
      }
    }

    // Copy commerce-interface files
    console.log('');
    console.log('📦 Copying Commerce Interface...');
    for (const { src, dest, optional } of commerceInterfaceFiles) {
      const srcPath = join(commerceInterfaceSourceDir, src);
      const destPath = join(targetDir, dest);

      if (existsSync(srcPath)) {
        const destDir = dirname(destPath);
        if (!existsSync(destDir)) {
          await mkdir(destDir, { recursive: true });
        }

        await copyFile(srcPath, destPath);
        console.log(`✅ Copied: ${dest}`);
      } else if (!optional) {
        console.warn(`⚠️  File not found: ${src}`);
      }
    }

    // Copy auth files (optional - may not exist if auth package not installed)
    if (existsSync(authSourceDir)) {
      console.log('');
      console.log('📦 Copying Auth components...');
      for (const { src, dest, optional } of authFiles) {
        const srcPath = join(authSourceDir, src);
        const destPath = join(targetDir, dest);

        if (existsSync(srcPath)) {
          const destDir = dirname(destPath);
          if (!existsSync(destDir)) {
            await mkdir(destDir, { recursive: true });
          }

          await copyFile(srcPath, destPath);
          console.log(`✅ Copied: ${dest}`);
        } else if (!optional) {
          console.warn(`⚠️  File not found: ${src}`);
        }
      }
    }

    // Copy vendor dependencies
    console.log('');
    console.log('📦 Copying vendor dependencies...');
    for (const { pkg, src, dest } of vendorDeps) {
      const srcPath = join(projectRoot, 'node_modules', pkg, src);
      const destPath = join(targetDir, dest);

      if (existsSync(srcPath)) {
        const destDir = dirname(destPath);
        if (!existsSync(destDir)) {
          await mkdir(destDir, { recursive: true });
        }

        await copyFile(srcPath, destPath);
        console.log(`✅ Copied: ${pkg}/${src} → ${dest}`);
      } else {
        console.warn(`⚠️  File not found: ${pkg}/${src}`);
      }
    }

    console.log('');
    console.log('✨ Setup complete!');
    console.log('📁 Files available at: scripts/universal-sf-ui/');

    // Create Preact-compatible zustand wrapper
    console.log('');
    console.log('📝 Creating Preact-compatible zustand wrapper...');
    const zustandWrapperContent = `import { createStore } from './zustand-vanilla.js';
import { useSyncExternalStore } from 'preact/compat';

const identity = (arg) => arg;

export function useStore(api, selector = identity) {
  const slice = useSyncExternalStore(
    api.subscribe,
    () => selector(api.getState()),
    () => selector(api.getInitialState())
  );
  return slice;
}

const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};

export const create = ((createState) => createState ? createImpl(createState) : createImpl);

// Export vanilla store functions
export * from './zustand-vanilla.js';
`;

    const zustandWrapperPath = join(targetDir, 'vendor', 'zustand.js');
    await writeFile(zustandWrapperPath, zustandWrapperContent);
    console.log('✅ Created: vendor/zustand.js (Preact-compatible)');
    console.log('');
    console.log('📖 Usage in your AEM block:');
    console.log('');
    console.log('  // JavaScript');
    console.log("  import { ProductGrid } from '../../scripts/universal-sf-ui/index.js';");
    console.log("  import { productListStore } from '../../scripts/universal-sf-ui/stores.js';");
    console.log('');
    console.log('  // CSS (in your block CSS)');
    console.log("  @import '../../scripts/universal-sf-ui/tokens.css';");
    console.log("  @import '../../scripts/universal-sf-ui/style.css';");
    console.log('');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setupLibrary();
