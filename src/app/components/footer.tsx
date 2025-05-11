import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-900 text-white p-5 mt-5 text-center">
      <p>Quick Tech Institute of Information Technology © 2025</p>
      <p>Contact: +9230003657852 | Location: Gill Colony Near Hazaray Shah Muhalla, Mirpur Mathelo</p>
      <p className="space-x-4">
        <Link href="/main" className="text-white hover:underline">Home</Link>
        <Link href="/main/courses" className="text-white hover:underline">Courses</Link>
        <Link href="/main/admission" className="text-white hover:underline">Admissions</Link>
        <Link href="/main/contact" className="text-white hover:underline">Contact</Link>
        <Link href="/main/FAQ" className="text-white hover:underline">FAQ</Link>
       
      </p>
    </footer>
  );
};

export default Footer;