self.addEventListener('push', onPush);
console.log('Push event received in service worker');

async function onPush(event) {
    if (event.data) {
        const data = event.data.json();
        const { title, ...rest } = data.notification;

        const clients = await self.clients.matchAll();
        clients.forEach((client) => client.postMessage(data));

        self.registration.showNotification(title, {
            ...rest,
        });
    }
}
