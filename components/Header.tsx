import Image from 'next/image'

export default function Header() {
  return (
    <header className="mx-auto max-w-[980px] pt-4">
      <div className="flex items-center justify-between px-4">
        {/* Logo left */}
        <div className="flex items-center gap-2">
          <Image
            src="/coat.png"
            alt="Kadira State Coat of Arms"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
        </div>

        {/* Title centered (matches screenshot) */}
        <div className="absolute left-1/2 top-4 -translate-x-1/2 text-center">
          <h1 className="text-[13.5px] font-semibold tracking-tight text-gray-800">
            Kadira State Residents Online Registration
          </h1>
          <nav className="mt-1 hidden gap-4 md:flex">
            <a className="nav-link" href="#">Home</a>
            <a className="nav-link" href="#">Register</a>
            <a className="nav-link" href="#">Validate</a>
            <a className="nav-link" href="#">Help</a>
            <a className="nav-link" href="#">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
