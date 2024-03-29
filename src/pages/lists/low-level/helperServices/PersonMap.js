
export function MapGeneralPersonList(personList) {
  return personList.map(element => ({
    targetType: element.targetPersonDto.targetId,
    postId: element.postPersonId,
    name: element.targetPersonDto.name,
    age: element.targetPersonDto.age,
    city: element.targetPersonDto.location,
    details: element.targetPersonDto.description,
    image: element.imageDto.base64String,
    date: new Date(element.postDate).toDateString(),
    gender: element.targetPersonDto.gender
  }));
}