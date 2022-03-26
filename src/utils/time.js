export const calculateDate = (date, showAgo = true) => {
    var seconds = Math.floor((new Date() - date) / 1000)

    var interval = seconds / 31536000

    if (interval > 1) {
      return date.toLocaleDateString()
    }
    interval = seconds / 2592000
    if (interval > 1) {
      return date.toLocaleDateString()
    }
    interval = seconds / 86400
    if (interval > 1 && interval < 7) {
      return Math.floor(interval) + ' days' + (showAgo ? ' ago' : '')
    } else if (interval > 1) {
      return date.toLocaleDateString()
    }
    interval = seconds / 3600
    if (interval > 1) {
      return Math.floor(interval) + ' hours' + (showAgo ? ' ago' : '')
    }
    interval = seconds / 60
    if (interval > 1) {
      return Math.floor(interval) + ' minutes' + (showAgo ? ' ago' : '')
    }
    return Math.floor(seconds) + ' seconds' + (showAgo ? ' ago' : '')
  }