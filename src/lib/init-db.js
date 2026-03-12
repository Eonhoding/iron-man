#!/usr/bin/env node

/**
 * Script de inicialização do banco de dados
 * Executar: node src/lib/init-db.js
 */

const database = require('./database');

async function main() {
  console.log('🦾 IRON MAN - Inicializando banco de dados...\n');
  
  try {
    await database.initDatabase();
    console.log('\n✅ Banco de dados inicializado com sucesso!');
    console.log('📁 Arquivo: data/iron-man.db');
    console.log('\nPróximos passos:');
    console.log('  1. npm run dev - para rodar o servidor');
    console.log('  2. Acesse http://localhost:3000');
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error.message);
    process.exit(1);
  }
}

main();
