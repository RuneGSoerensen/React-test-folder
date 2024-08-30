export default function User({ name, mail, image }) {
  return (
    <div className="user--card">
      <img width={200} src={image} alt={name} />
      <h1>Hello! {name}</h1>
      <p>Your email is: {mail}</p>
    </div>
  );
}
