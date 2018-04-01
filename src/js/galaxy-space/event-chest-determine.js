define(['require', 'jquery', 'eventStatusDo'], (require, $, eventStatusDo) => {
  return (chest, targets) => {
    switch (chest.status) {
      case 'LOCKED':
        eventStatusDo.locked(chest, targets)
        break

      case 'UNLOCKING':
        eventStatusDo.unLocking(chest, targets)
        break

      case 'READY':
        eventStatusDo.ready(chest, targets)
        break

      case 'OPEN':
        eventStatusDo.open(chest, targets)
        break
    }
  }
})
