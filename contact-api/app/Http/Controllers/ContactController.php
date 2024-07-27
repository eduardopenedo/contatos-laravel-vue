<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
            $user = $request->user();

               // Buscar todos os contatos
               $contacts = Contact::all();

               // Para cada contato, buscar a note de outra fonte e adicionar ao contato
               $contacts->each(function ($contact) use ($user){
                   try{
                       $contact->image = $this->getImageForContact($user->id ,$contact->id)
                        ;
                   } catch(Exception $e){
                        Log::debug("$e->message()");
                   }
               });
       
               return response()->json($contacts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fieldsTovalidate = [
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'image' => 'required|string', // Supondo que a imagem seja passada como string Base64
        ];
        
        // Validar todos os campos, incluindo os que não serão salvos
        $request->validate($fieldsTovalidate);
        
        // Coletar apenas os dados que serão salvos no banco de dados
        $contactData = $request->only(['name', 'phone', 'email']);
        
        // Adicionar o hash md5 da imagem ao array de dados do contato
        $contactData['image_md5'] = md5($request->image);
        
        // Criar o contato no banco de dados
        $contact = Contact::create($contactData);
        
        if ($request->image != null) {
            // Salvar a imagem no storage
            Storage::put($request->user()->id . '/' . $contact->id . '.jpg', base64_decode($request->image));
        }
        
        // Retornar a resposta com o contato criado
        return response()->json($contact, 201);
        
    }
    
    /**
     * Display the specified resource.
     */
    public function show(Request $request, Contact $contact)
    {
        //
        $user = $request->user();
        $contact->image = $this->getImageForContact($user->id ,$contact->id);
        // Retorna o contato atualizado com a imagem
        return response()->json($contact);;
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        //
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $contact->image_md5=md5($request->image);
        $contact->update($request->all());

        if($request->image!=null){
            if( md5($request->image) != md5($contact->image_md5))
            {
                Storage::delete($request->user()->id.'/'.$contact->id.'.jpg');
                Storage::put($request->user()->id.'/'.$contact->id.'.jpg', base64_decode( $request->image));
            }

        }

        return response()->json($contact, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Contact $contact)
    {
        //
        $contact->delete();

        Storage::delete($request->user()->id.'/'.$contact->id.'.jpg');
        return response()->json(
            [
                'message' => 'Contact deleted'
            ], 
            204
        );
    }


    public function getImageForContact($usrId, $contactId)
    {
        $pathToFile = $usrId . '/' . $contactId . '.jpg';
        
        if (!Storage::exists($pathToFile)) {
            Log::error("File does not exist at path: $pathToFile");
            return null;
        }

        $contents = Storage::get($pathToFile);
        Log::debug('File contents retrieved successfully.');

        // Encode the contents in base64
        $base64Image = base64_encode($contents);

        // Return the base64-encoded image data
        return 'data:image/jpeg;base64,' . $base64Image;
    }
}