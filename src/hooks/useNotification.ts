import type { NotificationInstance, NotificationPlacementList } from 'tdesign-vue-next/es/notification/type'
import { NotifyPlugin } from 'tdesign-vue-next'

const infoNotify = (title: string, message: string, footer = '', duration = 3000, placement: NotificationPlacementList = 'bottom-right'): Promise<NotificationInstance> => {
  return NotifyPlugin.info({
    title,
    content: message,
    footer,
    duration,
    placement,
    closeBtn: true
  })
}

const successNotify = (title: string, message: string, footer = '', duration = 3000, placement: NotificationPlacementList = 'bottom-right'): Promise<NotificationInstance> => {
  return NotifyPlugin.success({
    title,
    content: message,
    footer,
    duration,
    placement,
    closeBtn: true
  })
}

const warningNotify = (title: string, message: string, footer = '', duration = 3000, placement: NotificationPlacementList = 'bottom-right'): Promise<NotificationInstance> => {
  return NotifyPlugin.warning({
    title,
    content: message,
    footer,
    duration,
    placement,
    closeBtn: true
  })
}

const errorNotify = (title: string, message: string, footer = '', duration = 3000, placement: NotificationPlacementList = 'bottom-right'): Promise<NotificationInstance> => {
  return NotifyPlugin.error({
    title,
    content: message,
    footer,
    duration,
    placement,
    closeBtn: true
  })
}

const closeNotify = (notify: Promise<NotificationInstance>) => {
  NotifyPlugin.close(notify)
}

const closeAllNotify = () => {
  NotifyPlugin.closeAll()
}

export {
  infoNotify,
  successNotify,
  warningNotify,
  errorNotify,
  closeNotify,
  closeAllNotify
}
