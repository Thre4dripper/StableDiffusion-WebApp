import axios from 'axios'

class LinkPreviewService {
    getLinksPreview = async (urls: string[]) => {
        const promises = urls.map((url) => {
            return axios.get(url)
        })

        const responses = await Promise.all(promises)

        return responses.map((response) => {
            return {
                url: response.config.url,
                ...this.parseHTML(response.data),
            }
        })
    }

    parseHTML = (html: string) => {
        const title = html.match(/<title[^>]*>([^<]+)<\/title>/)
        const description = html.match(/<meta name="description" content="([^"]+)"/)
        const image = html.match(/<meta property="og:image" content="([^"]+)"/)

        return {
            title: title ? title[1] : '',
            description: description ? description[1] : '',
            image: image ? image[1] : '',
        }
    }
}

export default new LinkPreviewService()
