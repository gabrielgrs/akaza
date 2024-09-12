import { del, put } from '@vercel/blob'

async function upload(file: File, folder?: string) {
	const fileName = folder ? `${folder}/${file.name}` : file.name
	return put(fileName, file, { access: 'public' })
}

async function remove(url: string) {
	return del(url)
}

export const storage = {
	upload,
	remove,
}
