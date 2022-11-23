import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload"

cloudinary.config({
  cloud_name: 'dzxumo888',
  api_key: '253123416494263',
  api_secret: 'wjwbF8GAYdbk0DauxF-lgW5fnSY',
  secure: true
})

describe('Pruebas en fileUpload', () => {
  test('Debe de subir el archivo correctamente a cloudinary', async () => {

    const imageUrl = 'https://pbs.twimg.com/profile_images/640666088271839233/OTKlt5pC_400x400.jpg'
    const resp = await fetch(imageUrl)
    const blob = await resp.blob()
    const file = new File([blob], 'test.jpg')

    const url = await fileUpload(file)

    expect(typeof url).toBe('string')

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '')

    await cloudinary.api.delete_resources(['journal/' + imageId], {
      resource_type: 'image'
    })

  })

  test('Debe de retornar null', async () => {
    const file = new File([], 'test.jpg')

    const url = await fileUpload(file)

    expect(url).toBe(null)
  })
})