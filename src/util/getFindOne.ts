export const findOne = (item: string) => {
    return item.toLowerCase().replace(' ', '-');
}

export const findJoin = (recipe: string) => {
    return recipe.toLowerCase().replace(/\s+/gi, '').replace(/-/gi, '').replace(/'/gi, '').trim();
}