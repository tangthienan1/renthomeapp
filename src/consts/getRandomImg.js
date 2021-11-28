export const getRandomImageUrl = () => {
    const randomId = Math.trunc(Math.random() * 100);
    return `'https://picsum.photos/id/${randomId}/200/200'`
}