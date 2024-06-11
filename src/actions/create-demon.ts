'use server';

export async function createDemon(formData: FormData) {
    const name = formData.get('name');
    const comment = formData.get('comment');

    console.log(name, comment);
    //TODO revalidate Home Page
}