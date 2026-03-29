import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <Container>
        <div className="py-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2026 箩筐体育. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}