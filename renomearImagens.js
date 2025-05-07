import fs from 'fs';
import path from 'path';

// Lista de palavras a serem ignoradas, como "da", "de", etc.
const ignoreWords = ['da', 'de', 'do', 'dos', 'das'];

// Ajustando a forma de calcular o diretório atual
const __dirname = path.resolve();  // Pegando a raiz do projeto

// Caminho correto para a pasta img_colaborador
const folderPath = path.join(__dirname, 'public', 'img_colaborador');

// Verifica se o caminho da pasta está correto e lê os arquivos
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Erro ao ler a pasta:', err);
    return;
  }

  files.forEach((file) => {
    const ext = path.extname(file); // pega a extensão (.JPG, .PNG, etc)
    const base = path.basename(file, ext); // remove a extensão
    const nameParts = base.trim().split(/\s+/); // separa por espaço

    // Filtra as palavras ignoradas
    const filteredNameParts = nameParts.filter(part => !ignoreWords.includes(part.toLowerCase()));

    if (filteredNameParts.length >= 2) {
      const first = filteredNameParts[0].toUpperCase();
      const second = filteredNameParts[filteredNameParts.length - 1].toUpperCase();
      const newName = `${first}_${second}${ext.toUpperCase()}`;

      const oldPath = path.join(folderPath, file);
      const newPath = path.join(folderPath, newName);

      fs.rename(oldPath, newPath, (renameErr) => {
        if (renameErr) {
          console.error(`Erro ao renomear ${file}:`, renameErr);
        } else {
          console.log(`✅ ${file} → ${newName}`);
        }
      });
    } else {
      console.warn(`⚠️ Ignorado (nome curto demais): ${file}`);
    }
  });
});
