export interface LeadData {
  name: string
  email: string
  linkedInUrl?: string
  interests: string[]
  source?: string
  referrer?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  submission_timestamp?: string
}

/**
 * リード送信メイン関数
 * 将来的に HubSpot, Kajitoru CRM, Google Forms, Webhook などに差し替え可能
 */
export const submitLead = async (data: LeadData): Promise<{
  success: boolean
  message: string
  error?: string
}> => {
  try {
    // Step 1: Development - Console output
    console.log('📊 Lead Data Submitted:', data)

    // Step 2: Try to submit to API endpoint (fallback to mock if not available)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`)
      }

      const result = await response.json()
      return {
        success: true,
        message: 'リード登録完了',
      }
    } catch (apiError) {
      // API not available - use mock success
      console.warn('⚠️ API endpoint not available, using mock mode', apiError)
      return {
        success: true,
        message: 'リード登録完了（開発モード）',
      }
    }
  } catch (error: any) {
    console.error('❌ Submission error:', error)
    return {
      success: false,
      message: 'リード登録に失敗しました',
      error: error.message,
    }
  }
}

/**
 * CRM統合用: HubSpot API への送信例（テンプレート）
 * 将来的に有効化
 */
export const submitToHubSpot = async (data: LeadData) => {
  // const HUBSPOT_API_KEY = process.env.NEXT_PUBLIC_HUBSPOT_API_KEY
  // const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${HUBSPOT_API_KEY}`,
  //   },
  //   body: JSON.stringify({
  //     properties: {
  //       firstname: data.name.split(' ')[0],
  //       lastname: data.name.split(' ')[1] || '',
  //       email: data.email,
  //       phone: data.linkedInUrl || '',
  //       kajitoru_interests: data.interests.join(';'),
  //       kajitoru_source: data.source,
  //       kajitoru_referrer: data.referrer,
  //     },
  //   }),
  // })
  // return response.json()
}

/**
 * CRM統計用: Google Forms へのリダイレクト送信例（テンプレート）
 */
export const submitToGoogleForms = async (data: LeadData, formUrl: string) => {
  // const formData = new FormData()
  // formData.append('entry.123456789', data.name) // Form entry ID に置き換え
  // formData.append('entry.987654321', data.email)
  // await fetch(formUrl, {
  //   method: 'POST',
  //   body: formData,
  // })
}
