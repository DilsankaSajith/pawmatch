import { getPetProfileById } from './actions';
import PetProfilePage from './pet-profile';

const page = async ({ params }: { params: { petId: string } }) => {
  const { petId } = await params;
  const pet = await getPetProfileById(petId);
  return <PetProfilePage pet={pet} />;
};

export default page;
