function create(...object) {
    console.log(object);
    return {
        id : object.id,
        title : object.title,
        desc : object.desc,
        rating : object.rating,
        expanded : false
    };
}

export default {
    create
}