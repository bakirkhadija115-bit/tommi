export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>مرحباً بك في منصة Tommi للبيانات!</h1>
      <p>المنصة تعمل بنجاح.</p>
      <a href="/admin" style={{ color: "blue", textDecoration: "underline" }}>الانتقال إلى لوحة التحكم (/admin)</a>
    </main>
  );
}
