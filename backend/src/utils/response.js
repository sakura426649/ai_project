export function success(data, message = 'ok') {
  return { success: true, data, message }
}

export function error(message = 'Internal Server Error', code = 500) {
  return { success: false, message, code }
}

export function paginated(data, total, page, pageSize) {
  return {
    success: true,
    data,
    meta: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) }
  }
}
