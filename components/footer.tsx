export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} MentorJee. All rights reserved.
          </div>
          <div className="space-x-4">
            <a href="/privacy" className="text-sm hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
