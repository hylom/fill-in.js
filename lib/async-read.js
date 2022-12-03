import readSync from 'read';

export async function read(options) {
  return new Promise((resolve, reject) => {
    readSync(options, (error, result, isDefault) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ result, isDefault });
    });
  });
}
