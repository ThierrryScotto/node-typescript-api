import * as path from 'path';
import moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '../..'); //importa todos os arquivos

moduleAlias.addAliases({
  '@src': path.join(files, 'src'),
  '@test': path.join(files, 'test'),
});