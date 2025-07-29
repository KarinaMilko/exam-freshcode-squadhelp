export const countCompletedEvents = events => {
  const now = new Date();
  return events.filter(e => {
    const eventDateTime = new Date(`${e.date}T${e.time}`);

    const notifyBeforeTime =
      (e.notifyBeforeDays || 0) * 24 * 60 * 60 * 1000 +
      (e.notifyBeforeHours || 0) * 60 * 60 * 1000 +
      (e.notifyBeforeMinutes || 0) * 60 * 1000;

    const notifyAt = new Date(eventDateTime.getTime() - notifyBeforeTime);

    return notifyAt <= now && e.isMessageVisible !== false;
  }).length;
};
