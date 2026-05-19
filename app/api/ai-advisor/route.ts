export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(req: NextRequest) {
  const client = new Anthropic()
  try {
    const { image } = await req.json()

    if (!image || !image.startsWith('data:image/')) {
      return NextResponse.json({ error: 'Imagen inválida' }, { status: 400 })
    }

    // Extract base64 data and media type
    const matches = image.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/)
    if (!matches) {
      return NextResponse.json({ error: 'Formato de imagen inválido' }, { status: 400 })
    }
    const mediaType = matches[1] as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
    const base64Data = matches[2]

    const response = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64Data,
              },
            },
            {
              type: 'text',
              text: `Eres un experto barbero y asesor de imagen masculina. Analiza la foto de esta persona y proporciona recomendaciones de corte de pelo personalizadas.

Analiza:
1. La forma del rostro (ovalado, cuadrado, redondo, rectangular, triangular, corazón)
2. La textura del cabello (liso, ondulado, rizado)
3. El grosor del cabello
4. La línea capilar

Responde ÚNICAMENTE con un objeto JSON válido con esta estructura exacta:
{
  "cuts": ["nombre corte 1", "nombre corte 2", "nombre corte 3"],
  "reasoning": "explicación breve de por qué estos cortes funcionan para su tipo de rostro y cabello",
  "tips": ["consejo de estilo 1", "consejo de estilo 2", "consejo de estilo 3"],
  "avoid": ["qué evitar 1", "qué evitar 2"]
}

Los nombres de cortes deben ser nombres reales de barbería en español (ej: Fade, Undercut, Pompadour, Corte Clásico, etc.)`,
            },
          ],
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Respuesta IA inválida')
    }

    const recommendation = JSON.parse(jsonMatch[0])
    return NextResponse.json({ recommendation })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error al analizar la imagen'
    console.error('AI Advisor error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
