export default function Footer() {
    return (
        <footer className="bg-light text-center py-3 mt-4">
            <p className="mb-0">
                © {new Date().getFullYear()} code by Phuc with contribution from GPT
            </p>
        </footer>
    );
}
