export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2>The Amazing Data Page</h2>
      <div className="grid grid-cols-3">
        <div>Column - 1 </div>
        <div>Column - 2 </div>
        <div>Column - 3 </div>
      </div>
    </div>
  );
}
