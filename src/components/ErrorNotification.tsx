type Props = {
  fetchError: string | null;
};

export default function ErrorNotification({ fetchError }: Props) {
  return <p className="bg-red-500 text-center text-white p-2">{fetchError}</p>;
}
