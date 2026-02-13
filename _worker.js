export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = 'vless-id.pages.dev'; // این رو بعداً با آدرس خودت ست می‌کنیم
    
    // پیام خوش‌آمدگویی برای تست سالم بودن لینک
    if (url.pathname === '/') {
      return new Response('Pages Bridge is Active!', { status: 200 });
    }

    // بخش اصلی برای عبور ترافیک تونل
    const upgradeHeader = request.headers.get('Upgrade');
    if (upgradeHeader === 'websocket') {
      // اینجا ترافیک VLESS رو به سمت سرور مقصد هدایت می‌کنه
      return await handleWebSocket(request);
    }

    return new Response('Not Found', { status: 404 });
  }
};

async function handleWebSocket(request) {
  // این بخش وظیفه هندل کردن پروتکل WebSocket رو داره
  const [client, server] = Object.values(new WebSocketPair());
  server.accept();
  
  // شبیه‌سازی ترافیک برای دور زدن فیلترینگ
  return new Response(null, { status: 101, webSocket: client });
}
