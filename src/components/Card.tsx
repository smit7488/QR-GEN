interface CardProps {
    title: string;
    children: React.ReactNode;
  }
  
  export default function Card({ title, children }: CardProps) {
    return (
      <div className="card">
        <h2 className="text-lg">{title}</h2>
        <div>{children}</div>
      </div>
    );
  }
  