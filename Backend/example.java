import java.util.*;

class Example{
    public static void main(String args[]){
        ArrayList<Integer> pin = new ArrayList<Integer>();
        ArrayList<Integer> pinR = new ArrayList<Integer>();
        Scanner sc = new Scanner(System.in);

        int PINl,temp,check=1;
        System.out.println("Enter length of the PIN code: ");
        PINl = sc.nextInt();

        for(int i=0;i<PINl;i++){
            temp = sc.nextInt();
            pin.add(temp);
        }

        for(int i=PINl-1;i>=0;i--){
            pinR.add(pin.get(i));
        }

        for(int i=0;i<PINl;i++){
            if(pin.get(i)==pinR.get(i)){
                continue;
            }
            else{
                System.out.println("Not a Palindrome");
                check=0;
                break;
            }
        }

        if(check!=0){
            System.out.println("Palindrome");
        }
    } 
}