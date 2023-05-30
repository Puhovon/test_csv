import _ from 'lodash';

const contentObj = (content) => {
  const currentContent = content.split('\n').filter((line) => line !== '');
  const keys = currentContent[0].split(',');
  const obj = currentContent.slice(1).map((el) => {
    const values = el.split(',');
    const curValues = [];
    for (let i = 0; i < values.length; i += 1) {
      if (values[i].startsWith('"')) {
        curValues.push(`${values[i]},${values[i + 1]}`);
        i += 1;
      } else {
        curValues.push(values[i]);
      }
    }
    const object = keys.reduce((acc, value, index) => {
      const re = /"/gi;
      acc[value] = curValues[index].replace(re,'');
      return acc;
    }, {});
    return object;
  });
  return obj;
};

function countOfPassenger(content) {
  console.log(`Количество пассажиров: ${content.length}`);
}

function namesOfEmbarked(content) {
  const embarkeds = _.uniq(content.reduce((acc, pass) => {
    acc.push(pass.Embarked);
    return acc;
  }, [])).filter((el) => el !== '');
  console.log(`Наименования портов: ${embarkeds.join(', ')}`);
}

function ratio(content) {
  const gender = content.filter((el) => el.Sex === 'male');
  const female = content.length - gender.length;
  console.log(`Соотношение мужчин: ${((gender.length / content.length) * 100).toFixed(2)}%`);
  console.log(`Соотношение женщин: ${((female / content.length) * 100).toFixed(2)}%`);
}

function countOfSurvived(content) {
  const count = content.filter((el) => el.Survived === '1');
  console.log(`Процент выживших: ${((count.length / content.length) * 100).toFixed(2)}%`);
}

function namesStartOnA(content) {
  const names = content.reduce((acc, pass) => {
    if(pass.Name.startsWith('A')) {
      acc.push(pass.Name);
    }
    return acc;
  }, [])
  console.log(`Все пассажиры у которых имя начинается на А: ${names.join(', ')}`);
}

export default function solution(content) {
  // BEGIN
  const obj = contentObj(content);
  countOfPassenger(obj);
  namesOfEmbarked(obj);
  ratio(obj);
  countOfSurvived(obj);
  namesStartOnA(obj);
  // END
}
