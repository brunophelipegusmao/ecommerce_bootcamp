export default function Footer() {
  return (
    <footer className="bg-card p-6 text-center">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </footer>
  );
}