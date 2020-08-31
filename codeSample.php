<?php
// {
//   "comakers": [
//     {
//       "name": "Sample",
//       "email": "sample@email.com"
//     },
//     {
//       "name": "Test",
//       "email": "test@email.com"
//     }
//   ]
// }

// wrong  

public function update(Request $request, $id)
{
    $data = $request->all();

    foreach ($data as $comaker){
        $nominate = new Nominate();
        $nominate->loan_application_id = $id;
        $nominate->comaker_name = $comaker->name;
        $nominate->comaker_email = $comaker->email;

        $nominate->save();
    }

}

// Correct 
// Notice that you should use `json()` since the data is in json format
$data = $request->json()->all();

foreach ($data['comakers'] as $comaker) {
  $nominate = new Nominate();
  $nominate->loan_application_id = $id;
  $nominate->comaker_name = $comaker['name'];
  $nominate->comaker_email = $comaker['email'];

  $nominate->save();
}

// of course you could also cast the result to an object like this:

foreach ($data['comakers'] as $item) {
  $comaker = (object) $item;
  $nominate = new Nominatevar_dump($data);


  //pizza order and the delivery address with the contact details for the client.
   address, email, phone, password. Register on checkout page.
//   Registration/ Login is not required to order pizza but could be available for checking the history of orders
   page to login and check orders history
// e menu contains at least 8 pizza