<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password as PasswordRules;

class RegistroRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'confirmed', PasswordRules::min(8)->letters()->numbers()->symbols()],
        ];
    }
    public function messages()
    {
        return [
            'name' => 'El nombre es Obligatorio',
            'email.required'=> 'El email es Obligatorio ',
            'email.email'    => 'El email no es válido ',
            'email.unique'    => 'El email ya esta registrado ',
            'password.required' => 'El password es obligatorio ',
            'password.confirmed' => 'El password es distinto ',
            'password' => 'El password debe tener al menos 8 caracteres, una letra, un Simbolo y un Numero ',
        ];
    }
}
