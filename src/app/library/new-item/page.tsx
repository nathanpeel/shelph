"use client";

export default function Page() {
  return (
    <main>
      <h1>Enter the Book Details</h1>
      <form action="">
        <div>
          {/* Book Title */}
          <div>
            <label htmlFor="title">Enter book title</label>
            <div>
              <input type="text" />
            </div>
          </div>
          {/* Book author */}
          <div>
            <label htmlFor="title">Enter an author</label>
            <div>
              <input type="text" />
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
