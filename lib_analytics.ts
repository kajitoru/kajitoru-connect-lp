'use client'

export interface AnalyticsParams {
  from?: string
  ref?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
}

/**
 * URLパラメータを取得して計測データを構築
 * useSearchParams() を使用している場合のクライアント側ロジック
 */
export const getAnalyticsParams = (
  searchParams: URLSearchParams
): AnalyticsParams => {
  return {
    from: searchParams.get('from') || undefined,
    ref: searchParams.get('ref') || undefined,
    utm_source: searchParams.get('utm_source') || undefined,
    utm_medium: searchParams.get('utm_medium') || undefined,
    utm_campaign: searchParams.get('utm_campaign') || undefined,
    utm_content: searchParams.get('utm_content') || undefined,
  }
}

/**
 * 計測データをコンソールに出力（開発用）
 */
export const logAnalytics = (params: AnalyticsParams) => {
  console.log('📊 Analytics Params:', params)
}

/**
 * HubSpot, CRM, Google Formsなどへの送信用に計測データを付与
 */
export const enrichLeadDataWithAnalytics = (
  leadData: any,
  analyticsParams: AnalyticsParams
) => {
  return {
    ...leadData,
    source: 'online_meeting',
    referrer: analyticsParams.from || analyticsParams.ref,
    utm_source: analyticsParams.utm_source,
    utm_medium: analyticsParams.utm_medium,
    utm_campaign: analyticsParams.utm_campaign,
    utm_content: analyticsParams.utm_content,
    submission_timestamp: new Date().toISOString(),
  }
}
