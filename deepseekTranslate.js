const axios = require('axios')

const DEEPSEEK_API_KEY = '' // 替换为您的 DeepSeek API 密钥
const API_URL = 'https://api.deepseek.com/v1/chat/completions'

async function translateText(text) {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content:
              'You are a translator. Translate the given Chinese text to English. Only provide the translation, no explanations.',
          },
          { role: 'user', content: `Translate the following Chinese text to English: "${text}"` },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
      }
    )

    return response.data.choices[0].message.content.trim()
  } catch (error) {
    console.error('Translation error:', error)
    return text // 如果翻译失败,返回原文
  }
}

module.exports = translateText
