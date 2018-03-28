define(['require', 'jquery', 'eventStatusDo'], (require, $, eventStatusDo) => {
  return (chest, targets) => {
    if (chest.status === 'LOCKED') {
      eventStatusDo.locked(chest, targets)
    } else if (chest.status === 'UNLOCKING') {
      eventStatusDo.unLocking(chest, targets)
    } else if (chest.status === 'READY') {
      eventStatusDo.ready(chest, targets)
    } else if (chest.status === 'OPEN') {
      eventStatusDo.open(chest, targets)
    }
  }
})
