function create(object) {
//    console.log(object);
    return {
        id : object.id,
        url : object.url,
        title : object.title,
        desc : object.desc,
        rating : object.rating,
        expanded : false
    };
}

export default {
    create
}