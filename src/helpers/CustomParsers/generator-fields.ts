export default function parseDatasourceFields(blockName: string, lines: string[]) {
  return lines.map((line: string) => {
    let lineData: { blockName: string; name: string; value: any } = {
      blockName: blockName,
      name: '',
      value: { fromEnvVar: '', value: '' }
    };
    let [name, value] = line.split(' = ');
    lineData['name'] = name;
    if (value.indexOf('env(') > -1) {
      lineData['value'] = {
        fromEnvVar: value.split('env(')[1].split(')')[0].split('"')[1],
        value: ''
      };
    } else {
      lineData['value'] = {
        fromEnvVar: null,
        value: value.indexOf('[')
          ? value.split('[')[1].split(']')[0].split(',')
          : value.split('"')[1]
      };
    }
    return lineData;
  });
}
