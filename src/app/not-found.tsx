import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div key="1" className="flex flex-col grow items-center justify-center min-h-screen bg-white px-4">
      <div className="relative text-red-800 text-[400px] font-bold">
        404
        <img
          alt="Crashed image"
          className="absolute bottom-0 left-0 w-full object-cover opacity-50"
          height="100"
          src="/PageNotFoundImage.png"
          style={{
            objectFit: "cover",
          }}
          width="200"
        />
      </div>
      <h1 className="text-3xl font-semibold mt-8">Oops! You've crashed</h1>
      <p className="text-lg">The page you are looking for doesn't exist or has been moved</p>
    </div>
  )
}