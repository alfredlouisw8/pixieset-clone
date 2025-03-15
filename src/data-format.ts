import BigNumber from 'bignumber.js'
import { format, parse } from 'date-fns'
import { FormatOptions } from 'date-fns/format'
import { ja } from 'date-fns/locale/ja'

export function formatDecimal(
  value: string | number | null,
  {
    decimalPlaces = 4,
    withCommas = true,
    trimTrailingZeros = true,
    fallback = '',
  }: {
    decimalPlaces?: number
    withCommas?: boolean
    trimTrailingZeros?: boolean
    fallback?: string
  } = {}
) {
  if (value === null) {
    return fallback
  }
  if (typeof value === 'number' && !Number.isSafeInteger(value)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('value is not a safe integer')
    }
    return fallback
  }
  const bigNumber = new BigNumber(value)
  if (bigNumber.isNaN()) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('value is not a number')
    }
    return fallback
  }
  if (!bigNumber.isFinite()) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('value is not a finite number')
    }
    return fallback
  }

  // 少数部を指定した桁数までで切り捨てる
  const decimal = withCommas
    ? bigNumber.toFormat(decimalPlaces, BigNumber.ROUND_DOWN) // 3桁カンマ区切り(デフォルトのフォーマット)
    : bigNumber.toFormat(decimalPlaces, BigNumber.ROUND_DOWN, {
        decimalSeparator: '.',
        groupSeparator: '',
      }) // カンマなし
  return trimTrailingZeros
    ? decimal
        .replace(/\.0+$/g, '') // 小数部が不要(0のみ)である場合削除
        .replace(/(\.\d*?[1-9])0+$/g, '$1') // 小数部の末尾の0を削除
    : decimal
}

export function formatInteger(
  value: string | number | null,
  {
    withCommas = true,
    fallback = '',
  }: {
    withCommas?: boolean
    fallback?: string
  } = {}
) {
  return formatDecimal(value, {
    decimalPlaces: 0,
    withCommas,
    trimTrailingZeros: true,
    fallback,
  })
}

export function formatDateTime(
  dateTime: string | Date | null,
  {
    option = { locale: ja },
    fallback = '',
  }: {
    option?: FormatOptions
    fallback?: string
  } = {}
) {
  if (!dateTime) {
    return fallback
  }
  try {
    const dateTimeObj =
      typeof dateTime === 'string' ? new Date(dateTime) : dateTime
    return format(dateTimeObj, 'PPpp', option)
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('dateTime is invalid', error)
    }
    return fallback
  }
}

export function formatDateTimeWithFormatStr(
  dateTime: string | Date | null,
  formatStr: string,
  {
    option = { locale: ja },
    fallback = '',
  }: {
    option?: FormatOptions
    fallback?: string
  } = {}
) {
  if (!dateTime) {
    return fallback
  }
  try {
    const dateTimeObj =
      typeof dateTime === 'string' ? new Date(dateTime) : dateTime
    return format(dateTimeObj, formatStr, option)
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('dateTime is invalid', error)
    }
    return fallback
  }
}

export function formatDate(
  date: string | Date | null,
  {
    withDayOfWeek = false,
    option = { locale: ja },
    fallback = '',
  }: {
    withDayOfWeek?: boolean
    option?: FormatOptions
    fallback?: string
  } = {}
) {
  if (!date) {
    return fallback
  }
  try {
    const dateObj =
      typeof date === 'string' ? parse(date, 'yyyy-MM-dd', new Date()) : date
    const formatStr = withDayOfWeek ? 'PPPP' : 'PP'
    return format(dateObj, formatStr, option)
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('date is invalid', error)
    }
    return fallback
  }
}

export function formatDocumentTypeAndIssuerType(
  documentType: { label: string } | null | undefined,
  documentIssuerType: { label: string } | null | undefined
): string {
  const documentTypeLabel = documentType?.label ?? 'N/A'
  const documentIssuerTypeLabel = documentIssuerType?.label ?? 'N/A'
  return `${documentTypeLabel} / ${documentIssuerTypeLabel}`
}
