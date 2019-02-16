exports.allowedUsers = function allowedUsers(plan) {
  switch (plan) {
    case 'FREE':
      return 1
    case 'STARTER':
      return 2
    case 'GROWTH':
      return 5
    case 'ENTERPRISE':
      return Infinity
    default:
      throw new Error('Invalid Plan')
  }
}
